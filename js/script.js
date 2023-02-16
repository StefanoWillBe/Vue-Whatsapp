var app = new Vue(
    {
        el: "#app",
        data:
            {
                activeContact: 0,
                newMessage: "",
                searchContact: "",
                activeMenu: false,
                contacts: [
                    {
                        name: 'Michele',
                        avatar: '_1',
                        visible: true,
                        messages: [
                            {
                                date: '10/01/2020 15:30:55',
                                text: 'Hai portato a spasso il cane?',
                                status: 'send'
                            },
                            {
                                date: '10/01/2020 15:50:00',
                                text: 'Ricordati di dargli da mangiare',
                                status: 'send'
                            },
                            {
                                date: '10/01/2020 16:15:22',
                                text: 'Tutto fatto!',
                                status: 'received'
                            }
                        ],
                    },
                    {
                        name: 'Fabio',
                        avatar: '_2',
                        visible: true,
                        messages: [
                            {
                                date: '20/03/2020 16:30:00',
                                text: 'Ciao come stai?',
                                status: 'send'
                            },
                            {
                                date: '20/03/2020 16:30:55',
                                text: 'Bene grazie! Stasera ci vediamo?',
                                status: 'received'
                            },
                            {
                                date: '20/03/2020 16:35:00',
                                text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                                status: 'send'
                            }
                        ],
                    },
                    {
                        name: 'Samuele',
                        avatar: '_3',
                        visible: true,
                        messages: [
                            {
                                date: '28/03/2020 10:10:40',
                                text: 'La Marianna va in campagna',
                                status: 'received'
                            },
                            {
                                date: '28/03/2020 10:20:10',
                                text: 'Sicuro di non aver sbagliato chat?',
                                status: 'send'
                            },
                            {
                                date: '28/03/2020 16:15:22',
                                text: 'Ah scusa!',
                                status: 'received'
                            }
                        ],
                    },
                    {
                        name: 'Luisa',
                        avatar: '_6',
                        visible: true,
                        messages: [
                            {
                                date: '10/01/2020 15:30:55',
                                text: 'Lo sai che ha aperto una nuova pizzeria?',
                                status: 'send'
                            },
                            {
                                date: '10/01/2020 15:50:00',
                                text: 'Si, ma preferirei andare al cinema',
                                status: 'received'
                            }
                        ],
                    },
                ]
            },
        methods:
            {
                // Set Active Contact
                setActiveContact(index) {
                    this.activeContact = index;
                    this.activeMenu = false;
                },
                // Send New Message
                sendNewMessage() {
                    const newMessageObj = {
                        date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                        text: this.newMessage,                        
                        status: 'send'                        
                    };
    
                    
                    this.contacts[this.activeContact].messages.push(newMessageObj);

                    this.newMessage = "";

                    const sentMessageActiveContact = this.activeContact;

                    setTimeout(() => {

                        const newReplayObj = {
                            date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                            text: " Hola, da quanto tempo ...",
                            status: 'received'
                        };
                        this.contacts[sentMessageActiveContact].messages.push(newReplayObj);
                    }, 1000);

                },
                // Search Contact by input
                filterContact() {
                    //  String to LowerCase
                    const userFilterLowerCase = this.searchContact.toLowerCase();

                    this.contacts.forEach((contact) => {
                        //    String name in array contact to LowerCase
                        const contactName = contact.name.toLowerCase();

                        // Verify name contact is in input serach
                        if (contactName.includes(userFilterLowerCase)) {
                            contact.visible = true;
                        } else {
                            contact.visible = false;
                        }
                    });


                },
                // Delete message active user
                toggolDropDown(msgIndex) {

                    if (this.activeMenu === msgIndex) {
                        this.activeMenu = false;
                    } else {
                        this.activeMenu = msgIndex;
                    }
                },
                deleteMessage(msgindex) {
                    this.contacts[this.activeContact].messages.splice(msgindex, 1);
                    this.activeMenu = false;
                },
                // get active message for ultimate access
                getActivemessageDate(index) {
                    const ultimateMess = this.contacts[index].messages;
                    return ultimateMess[ultimateMess.length - 1].date;
                },
                // get ultimate text message
                getTextMessage(contactIndex){
                    const contactMessages = this.contacts[contactIndex].messages;
                    const contactLastMessage= contactMessages[contactMessages.length - 1].text;

                    let textToPrint= contactLastMessage.slice(0 ,30);
                    if(textToPrint.length >= 30){
                        textToPrint += "..."
                    }
                    return textToPrint;
                }

            }
    });