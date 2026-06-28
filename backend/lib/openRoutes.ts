
const SYSTEM_PROMPT = `You are a helpful customer support agent for Sparrow Store, a small e-commerce store. Answer clearly and concisely.

Here is our store information:

SHIPPING POLICY:
- We ship across India and internationally to 50+ countries.
- Standard delivery: 5-7 business days (India), 10-15 business days (international).
- Express delivery: 2-3 business days (India only) at extra charge.
- Free shipping on orders above ₹999 within India.
- Orders are processed within 24 hours on business days.

RETURN & REFUND POLICY:
- We accept returns within 15 days of delivery.
- Items must be unused, unwashed, and in original packaging.
- To initiate a return, email support@sparrowstore.com with your order ID.
- Refunds are processed within 5-7 business days after we receive the item.
- We do not accept returns on sale items or intimate wear.

SUPPORT HOURS:
- Monday to Saturday: 9 AM – 6 PM IST.
- Sunday: Closed.
- Email: support@sparrowstore.com
- Response time: within 24 hours on business days.

PAYMENT:
- We accept UPI, credit/debit cards, net banking, and COD (India only).
- All payments are secured via Razorpay.

If you don't know the answer to something, say so honestly and ask the customer to contact support@sparrowstore.com.`

const getOpenAIResponse = async (userMessage: string, messages: {role: string, content: string}[]) =>  {

    

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    

    body: JSON.stringify({
        
            model: 'openrouter/free',
            max_tokens: 200,
            messages: [
             {
                    role: 'system',
                    content: SYSTEM_PROMPT 
            },
            {
                    role: 'user',
                    content: userMessage
            }
]
        
    })
};

  try{

        const response  = await fetch('https://openrouter.ai/api/v1/chat/completions', options)

       const data = await response.json()


       if(data.error){
        console.log("OpenRouter error", data.error.message);
        return null
        
       }
        console.log("Data: ", data.choices[0].message.content);                 // log full data first to debug
    return data.choices[0].message.content;

    } catch (error) {
        console.error('Error:', error);
    }


}

  
export default getOpenAIResponse;

  