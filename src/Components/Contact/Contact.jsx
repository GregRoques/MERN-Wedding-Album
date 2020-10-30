import React, { Component } from "react";
import cssMessage from "./CSS/contact.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import { api } from "../../Dependencies/AxiosOrders";

class Contact extends Component {
    state = {
        name: "",
        email: "",
        phone: "",
        message: "",
        subject: "",
        loading: false
    };

    onChangeHandler = e => {
        const { name } = e.target;
        let { value } = e.target;

        if (name === "phone") {
            value = (value).replace(/[A-Za-z]/gi, "");
            const pattern = /^\(\d{3}\)\s\d{3}-\d{4}$/; // (xxx) xxx-xxxx
            const justNum = value.replace(/\D/g, "");
            if (justNum.length === 10 && !pattern.test(value)) {
                value = "(" + justNum.slice(0, 3) + ") " + justNum.slice(3, 6) + "-" + justNum.slice(6, 10);
            }
        }

        this.setState(
            { [name]: value }
        );
    };

    onSubmitHanlder = e => {
        e.preventDefault();
        if (this.state.loading === false) {
            this.setState({
                loading: true
            });
            const { name, email, phone, message } = this.state;
            const subject = !this.state.subject ? "New Email for Beds 4 Less" : this.state.subject;
            axios.post(`${api}/contact`, {
                name,
                email,
                phone,
                message,
                subject
            })
                .then(res => {
                    res.data === "Yes"
                        ? Swal.fire({
                            icon: "success",
                            title: "Hurray!",
                            text: "Your Email has been sent!"
                        }) : Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Something went wrong. You can still email us at Jason@nolabeds.com."
                        });
                    this.clearSubmitted();
                })
                .catch(() => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong. You can still email us at Jason@nolabeds.com."
                    });
                    this.clearSubmitted();
                });
        }
    };

    clearSubmitted = () => {
        this.setState({
            name: "",
            email: "",
            phone: "",
            message: "",
            subject: "",
            loading: false
        });
    }

    render () {
        return (
            <form className={ cssMessage.messageGrid } onChange={ this.onChangeHandler } onSubmit={e => this.onSubmitHanlder(e)} >
                <div>
                    <div className={ cssMessage.header }>
                        Message
                    </div>
                    <div className={ cssMessage.intro }>
                        Send us a brief message and our staff will respond to you within two business days.
                    </div>
                    <input className={ cssMessage.shortForm } type="text" name="name" placeholder="Full Name" value={ this.state.name } required/> <br/>
                    <input className={ cssMessage.shortForm } type="email" name="email" placeholder="Email" value={ this.state.email } required/> <br/>
                    <input className={ cssMessage.shortForm } type="tel" maxLength="14" name="phone" placeholder="Phone" value={ this.state.phone }/> <br/>
                    { this.state.loading === true
                        ? <div className={ cssMessage.sendingContainer }>
                            Sending<span className={cssMessage.sending1}>.</span><span className={cssMessage.sending2}>.</span><span className={cssMessage.sending3}>.</span>
                        </div> : <input className={ cssMessage.shortForm } type="text" maxLength="50" name="subject" placeholder="Subject" value={ this.state.subject}/>
                    }
                </div>
                <div>
                    <textarea className={ cssMessage.messageForm} type="text" name="message" placeholder="Message" value={ this.state.message } required/>
                    <button type="submit" className={ cssMessage.submit }>SUBMIT</button>
                </div>
            </form>
        );
    }
};


export default Contact;
