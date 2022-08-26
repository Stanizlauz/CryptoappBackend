export const verifyEmailHtml = (email: string, name: string, id: string) => {
    return `<div style="
    background-image: linear-gradient(180deg, black, rgb(20, 14, 40));
    ">
    <h1 style="
    color: rgb(49, 0, 128);
            font-size: 32px;
            line-height: 48px;
            margin: 0;
            text-align: center;
            font-family: Helvetica, Arial, sans-serif;
    ">ArksTrades</h1>
    <hr />
    <div>
        <img style="
        display: inline-block;
            margin: 0 auto;
            border-radius: 10px;
            margin-left: 10px;
            max-width: 20%;
        "
            src="cid:arkstrades"
            alt="arkstrades" />
    </div>
    <h2 style="
    color: rgb(247, 246, 246);
    margin: 0;
    font-size: 32px;
    line-height: 48px;
    font-weight: 300;
    text-align: center;
    font-family: Helvetica, Arial, sans-serif;
    ">Hello ${name}</h2>
    <p style="
    text-align: center;
    color: rgb(255, 251, 255);
    ">We are happy you signed up for ArksTrades.
    Please click on the button to verify your email.</p>
    <br />
    <button style="
    display: block;
            margin: 20px auto;
            border: 1px solid rgb(48, 103, 138);
            background: rgb(73, 22, 132);
            color: #fff;
            font-size: 16px;
            line-height: 22px;
            padding: 16px 24px;
            border-radius: 30px;
            box-shadow: rgba(24, 24, 40, 0.08) 0px 8px 8px 0;
            cursor: pointer;
            transition: color 10s;
    ">
        <a href="${id}" style="
        text-decoration: none;
            color: whitesmoke;
        ">Verify Email</a>
    </button>
   <br/>
   <hr/>
   <p style="
    text-align: center;
    color: rgb(255, 251, 255);
    ">This email was sent to ${email}</p>
   <em style="
   color: red;
   ">Please do not reply to this email.</em>
    </div>`;


};

export const forgotPasswordHtml = (email: string, name: string, id: string) => {
    return `<div style="
    background-image: linear-gradient(180deg, black, rgb(20, 14, 40));
    ">
    <h1 style="
    color: rgb(49, 0, 128);
            font-size: 32px;
            line-height: 48px;
            margin: 0;
            text-align: center;
            font-family: Helvetica, Arial, sans-serif;
    ">ArksTrades</h1>
    <hr />
    <div>
        <img style="
        display: inline-block;
            margin: 0 auto;
            border-radius: 10px;
            margin-left: 10px;
            max-width: 20%;
        "
            src="cid:arkstrades"
            alt="arkstrades" />
    </div>
    <h2 style="
    color: rgb(247, 246, 246);
    margin: 0;
    font-size: 32px;
    line-height: 48px;
    font-weight: 300;
    text-align: center;
    font-family: Helvetica, Arial, sans-serif;
    ">Hello ${name}</h2>
    <p style="
    text-align: center;
    color: rgb(255, 251, 255);
    ">We received a request to reset your password.
    </p>
    <br />
    <p style="
    text-align: center;
    color: rgb(255, 251, 255);
    ">Click on the button below to set up a new password for your account. If you did not request to reset your password, ignore this email.
    </p>
    <br />
    <button style="
    display: block;
            margin: 20px auto;
            border: 1px solid rgb(48, 103, 138);
            background: rgb(73, 22, 132);
            color: #fff;
            font-size: 16px;
            line-height: 22px;
            padding: 16px 24px;
            border-radius: 30px;
            box-shadow: rgba(24, 24, 40, 0.08) 0px 8px 8px 0;
            cursor: pointer;
            transition: color 10s;
    ">
        <a href="${id}" style="
        text-decoration: none;
            color: whitesmoke;
        ">Set new password</a>
    </button>
   <br/>
   <hr/>
   <p style="
    text-align: center;
    color: rgb(255, 251, 255);
    ">This email was sent to ${email}</p>
   <em style="
   color: red;
   ">Please do not reply to this email.</em>
    </div>`;


};

