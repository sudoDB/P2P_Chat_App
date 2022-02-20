<script>
    import {user} from './user';

    // let --> variable only in this block
    let username; 
    let password;

    // The functions
    function login(){
        user.auth(username, password, ({err}) => err && alert(err)); //Last part from error handling
    }

    function signup(){
        user.create(username, password, ({err}) => {
            if (err){ 
                alert(err)
            }else{ 
                login();
            }
        });
    }

</script>

<!--Form input that gives the value to thet block above-->
<label for="username">Username</label>
<input name="username" bind:value="{username}" minlength="3" maxlength="16" />
<label for="password">Password</label>
<input name="password" bind:value="{password}" minlength="6" maxlength="16" type="password"/>

<button class="login" on:click={login}>Login</button>
<button class="login" on:click={signup}>Sign Up</button>
