<script>
    export let message;
    export let sender;

    const avatar = `https://avatars.dicebear.com/api/initials/${message.author}.svg`;

    const messageClass = message.author === sender ? 'sent' : 'received';
    const ts = new Date(message.sendtime);
</script>
  
<div class={`message ${messageClass}`}>
    <img src={avatar} width="32" height="32" alt="avatar"/>
    <div class="message-text">
        <p>{message.content}</p>
    </div>
    <time>{ts.toLocaleTimeString()}</time>
</div>