import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { nanoid } from 'nanoid'
import { chats } from '../helpers/chats'
import { MessagesList } from '../MessagesList';
import { MessageForm } from '../MessageForm';


export class Messanger extends Component {
    state = {
        chats
    };

    handleMessageSend = (message) => {
        const { chats } = this.state;
        const { match } = this.props;
        message.id = nanoid();
        const chat = chats[match.params.id];
        chat.messages = this.messages.concat([message]);
        chats[match.params.id] = chat;
        this.setState({ chats });
    };

    // componentDidUpdate() {
    //     const { author } = this.state.messages[this.state.messages.length - 1];
    //     if (author !== 'Bot') {
    //         setTimeout(() => {
    //             this.handleMessageSend({ text: `Hi, ${author}! Бот на связи...`, author: 'Bot' });
    //         }, 3000);
    //     }
    // }
    get messages() {
        const { chats } = this.state;
        const { match } = this.props;
        let messages = null;
        if (match && chats[match.params.id]) {
            messages = chats[match.params.id].messages;
        }
        return messages;
    }
    render() {
        const messages = this.messages;
        return (
            <Grid item xs={9}>
                <div className="messanger">
                    <div className="messages__list">
                        {messages ? <MessagesList items={messages} /> : <div>Выберите чат</div>}
                    </div>
                    <div className="messages__form">
                        {messages && <MessageForm onSend={this.handleMessageSend} />}
                    </div>
                </div>
            </Grid>
        );
    }
}