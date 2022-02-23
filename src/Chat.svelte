<script>
    import Login from './Login.svelte'
    import Message from './Message.svelte'
    import {username, user} from './user';
    import {onMount} from 'svelte';

    import GUN from 'gun';
    const db = GUN();

    let newMessage;
    let messages = [];


    // Will run when GUN is initialized
    onMount(() =>{
        //Get messages / 'chat' = roomName
        db.get('mainRoom')
            .map()  // Loop over every message
            .once(async (data, id) =>{ // once for read only once | and async callback called on each new message to give us the content data
                if (data){
                    // Key for end to end encryption (Try to change it with a userinput)
                    const key = '#7udV7DRCQqY3rrg3';

                    var message = {
                        // Transform data
                        author: await db.user(data).get('alias'),     // let user system determine who it is
                        content: (await SEA.decrypt(data.content, key)) + '',    // force decrypt as text
                        sendtime: GUN.state.is(data, 'content'),  // get the internal timestamp
                    };

                    if (message.content){ // If content
                        messages = [...messages.slice(-100), message].sort((a, b) => a.sendtime - b.sendtime); //Add it to the messages array
                    }
                }
        });
    });

    async function sendMessage(){
        const secret = await SEA.encrypt(newMessage, '#7udV7DRCQqY3rrg3'); // Key for end to end encryption (Try to change it with a userinput)
        const message = user.get('all').set({content: secret});
        const index = new Date().toISOString();
        db.get('mainRoom').get(index).put(message);
        newMessage = '';
    }
</script>

<div class="container">
    {#if $username} <!--If username (store value, so usable across componments) present-->
        <!--Display messages-->
        <main>
            <!--Keyed loop, sort message by timestamp -->
            {#each messages as message (message.sendtime)}
                <Message {message} sender={$username} />
            {/each}
        </main>

        <!--Message input-->
        <form on:submit|preventDefault={sendMessage}>
            <input class="text-input" type="text" placeholder="Message goes here..." bind:value={newMessage} maxlength="100" />
            <button class="send-button" type="submit" disabled={!newMessage}>Send</button>
        </form>
    {:else}
        <main>
          <Login />
        </main>
    {/if}
</div>