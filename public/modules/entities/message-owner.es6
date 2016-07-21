class MessageOwner {
    static fromHtml(val) {
        switch (val) {
            case 'you':
                return MessageOwner.YOU;
            case 'them':
                return MessageOwner.THEM;
            default:
                throw new Error(`Invalid Owner type "${val}".`);
        }
    }
}
MessageOwner.YOU = 1;
MessageOwner.THEM = 2;

export default MessageOwner;