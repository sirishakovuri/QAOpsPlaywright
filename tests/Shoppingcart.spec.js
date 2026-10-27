import { test,expect } from "@playwright/test";

 test('browser context ',async ({page})=>
    {
      const productName='ZARA COAT 3';
      const products=page.locator(".card-body");
      await page.goto("https://rahulshettyacademy.com/client");
      await page.locator ("#userEmail").fill("sirishakvr587@gmail.com");
      await page.locator("#userPassword").fill("Siri@111");
      await page.locator("[value='Login']").click();             
      await page.waitForLoadState("networkidle");
      
      const titles = await page.locator(".card-body b").allTextContents();
console.log("Products:", titles);
        
        const count = await products.count();
        for(let i=0; i<count; ++i)
        {
if(await products.nth(i).locator("b").textContent()===productName)
{
  products.nth(i).locator("text=Add to cart").click();
  break;

        }
      }
      await page.locator("[routerlink*='cart']").click();
      //await page.pause();
  
     const bool= page.locator("h3:has-text('ZARA COAT3')").isVisible();
     await expect(
    page.getByText("ZARA COAT 3", { exact: true })
).toBeVisible();
//expect(bool).toBeTruthy();
    });
