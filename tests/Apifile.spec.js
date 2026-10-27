
import {test,expect,request} from "@playwright/test";

const loginPayLoad = {userEmail: "sirishakvr587@gmail.com", userPassword: "Siri@111"}
const orderPayLoad = {orders:[{country:"India",productOrderedId:"6262e95ae26b7e1a10e89bf0"}]}
let response;
let token;
let orderId;
test.beforeAll(async()=> 
    {
    const apiContext = await request.newContext();
   const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {data: loginPayLoad});
   const loginData = await loginResponse.json();
   token = loginData.token;

   const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
      data: orderPayLoad,
      headers: {Authorization: token}
   });
   const orderData = await orderResponse.json();
   orderId = orderData.orders[0];
   response = {token, orderId};
   await apiContext.dispose();
    
})
//test1,test2,test3

//create order is success
test('API place the order', async ({ page }) => 
    {
       await page.addInitScript(value=>{
        window.localStorage.setItem('token',value);
       },response.token);
         //js file- Login js, DashboardPage
   
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("button[routerlink*='myorders']").click();
   
const rows =  await page.locator("tbody tr");
 
 
for(let i =0; i<await rows.count(); ++i)
{
   const rowOrderId =await rows.nth(i).locator("th").textContent();
   if (rowOrderId && rowOrderId.includes(orderId))
    {
       await rows.nth(i).locator("button").first().click();
       break;
   }
}
const orderIdDetails =await page.locator(".col-text").textContent();

expect(orderIdDetails && response.orderId.includes(orderIdDetails)).toBeTruthy();
 
});
 
//Verify if order created is showing in history page
// Precondition - create order –
