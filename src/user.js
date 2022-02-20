import GUN from 'gun';
import 'gun/sea';   // Security Encryption & Authorization --> Auth
import 'gun/axe';   // Advance Exchange Equation --> Connect pears together
import {writable} from 'svelte/store'; // A store is a writable value that will refresh without reloading page


// Database
export const db = GUN();

// GUN User
export const user = db.user().recall({sessionStorag: true});

// Get username and set in a store variable
export const username = writable(''); 
user.get('alias').on(v => username.set(v))

// On connect
db.on('auth', async(event) =>{
    const alias = await user.get('alias'); //username string
    username.set(alias);

    console.log('signed in as ' + alias);
});