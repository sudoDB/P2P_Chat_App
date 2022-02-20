<script>
    // Signout componment
    import {username, user} from './user';

    function signout(){
        user.leave();
        username.set(''); // Reset shown username to empty string 
    }

</script>

<header>
    <!--Signout button-->
    <h1>🌍🌍🌍</h1>
    {#if $username} <!--If username (store value, so usable across componments) present-->
        <div class="user-bio">
            <span><strong>{$username}</strong></span>
            <!--Generate a .svg avatar from the initials of the username-->
            <img src={'https://avatars.dicebear.com/api/initials/${$username}.svg'} width="32" height="32" alt="avatar">
        </div>

        <button class="signout-button" on:click={signout}>Sign Out</button>
        
    {:else} <!--If username not present-->
        <h2>P2P ChatApp</h2>
    {/if}
</header>