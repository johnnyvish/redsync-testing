import { NextResponse } from "next/server";

const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

export async function POST(req) {

    console.log("API route called: /api/send-message");

    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    const { body, to } = await req.json();

    console.log(req.json());

    try {
        console.log(`Attempting to send message: '${body}' to '${to}'`);
        const message = await client.messages.create({
            body: body,
            from: "+18888315983",
            to: "+12019687506", // The phone number is now dynamic based on client input
            
        });

        console.log(`Message sent successfully. SID: ${message.sid}`);

        return new NextResponse(JSON.stringify({ success: true, sid: message.sid }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        console.error("Failed to send message: ", error.message);
        return new NextResponse(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

export async function CALL(req) {

    console.log("API route called: /api/send-call");

    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    const { body, to } = await req.json();

    console.log(req.json());

    try {
        console.log(`Attempting to call: '${body}' to '${to}'`);
        const message = await client.calls.create({
            url: 'http://demo.twilio.com/docs/voice.xml',
            from: "+18888315983",
            to: "+17323097782", // The phone number is now dynamic based on client input            
        });

        console.log(`Call sent successfully. SID: ${message.sid}`);

        return new NextResponse(JSON.stringify({ success: true, sid: message.sid }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        console.error("Failed to send message: ", error.message);
        return new NextResponse(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}