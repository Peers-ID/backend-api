const sgMail = require('@sendgrid/mail');
const bcryptService = require('./bcrypt.service');
const User = require('../models/User');

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

const emailService = () => {
        /*sgMail.setApiKey('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');*/

        const welcomeMessage = (name, email, password) => {

                /*const msg = {
                        to: email,
                        from: 'no-reply@peers.id',
                        subject: 'Selamat datang di Peers.id',
                        text: 'Welcome',
                        html: '<p>Halo <strong>'+ name +'</strong>,</p>'+
                                '<p>Terima Kasih sudah mendaftar di Peers Indonesia.' +
                                'Silahkan login dengan menggunakan akun berikut</p>' +

                                '<p>Username : '+ email +'<br />' +
                                'Password : '+ password +'</p>' +

                                '<p>Terima Kasih,</p>' +

                                '<p>Salam</p>'
                };

                sgMail.send(msg)
                        .then(() => {}, error => {
                                if (error.response) {
                                        return error.response.body;
                                }
                        });*/


            /*------------------------------- USE NODEMAILER -----------------------------*/

            var transporter = nodemailer.createTransport(smtpTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                auth: {
                    user: 'dev.peers.id@gmail.com',
                    pass: 'P##12s123'
                }
            }));

            var mailOptions = {
                from: '"Peers Indonesia" <admin@peers.id>',
                to: email,
                subject: 'Selamat datang di peers.id',
                text: 'Welcome',
                html: '<p>Halo <strong>'+ name +'</strong>,</p>'+
                '<p>Terima Kasih sudah mendaftar di Peers Indonesia.' +
                'Silahkan login dengan menggunakan akun berikut</p>' +

                '<p>Username : '+ email +'<br />' +
                'Password : '+ password +'</p>' +

                '<p>Terima Kasih,</p>' +

                '<p>Salam</p>'
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

        };

        const randomString = (length) => {
                var result           = '';
                var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for ( var i = 0; i < length; i++ ) {
                        result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
        }

        const forgotPassword = async (email) => {
                const new_pwd = { password:randomString(10) };
                const hash = bcryptService().password(new_pwd);

                const users = await User.update(
                        {
                                password: hash,
                        }
                        , {
                                where: { email:email }
                        });

                if(users){

                    /*const msg = {
                                to: email,
                                from: 'no-reply@peers.id',
                                subject: 'Reset Password',
                                text: 'Reset Password',
                                html: '<p>Halo <strong>'+ email +'</strong>,</p>'+
                                        '<p>Berikut password baru kamu untuk dapat login di Peers.id</p>' +

                                        '<p>Username : '+ email +'<br />' +
                                        'Password : '+ new_pwd.password +'</p>' +

                                        '<p>Untuk kenyamanan & keamanan, segera ganti password anda sesaat setelah login.</p>' +

                                        '<p>Salam</p>'
                    };

                    sgMail.send(msg)
                            .then(() => {}, error => {
                                    if (error.response) {
                                            return error.response.body;
                                    }
                            });*/



                    /*------------------------------- USE NODEMAILER -----------------------------*/

                    var transporter = nodemailer.createTransport(smtpTransport({
                        service: 'gmail',
                        host: 'smtp.gmail.com',
                        auth: {
                            user: 'dev.peers.id@gmail.com',
                            pass: 'P##12s123'
                        }
                    }));

                    var mailOptions = {
                        from: '"Peers Indonesia" <admin@peers.id>',
                        to: email,
                        subject: 'Reset Password',
                        text: 'Reset Password',
                        html: '<p>Halo <strong>'+ email +'</strong>,</p>'+
                        '<p>Berikut password baru kamu untuk dapat login di Peers.id</p>' +

                        '<p>Username : '+ email +'<br />' +
                        'Password : '+ new_pwd.password +'</p>' +

                        '<p>Untuk kenyamanan & keamanan, segera ganti password anda sesaat setelah login.</p>' +

                        '<p>Salam</p>'
                    };

                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                }
        };

        return {
                welcomeMessage,
                forgotPassword
        };

};

module.exports = emailService;
