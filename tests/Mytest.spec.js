import {test,expect} from "@playwright/test";

test('First playwright test ',async ({browser})=>
  {
      const context = await browser.newContext();
     const page=await context.newPage();
    
    });

    test.only('my playwright test ',async ({page})=>
    {
      const userName=page.locator("#username");
      const signIn = page.locator("#signInBtn");
      const cardTitles=page.locator(".cardbody a");
      await page.goto("https://www.google.com/");
        console.log (await page.title());
        await expect (page).toHaveTitle("Google");
//css type-fill
        await userName.fill("rahul");
await page.locator("[type=password]").fill("moksha");
await signIn.click();
//webdriver wait
console.log(await page.locator("[style*='block']").textContent());
await expect( page.locator("[style*='block']")).toContainText('Incorrect');
await userName.fill("");//to clear username which we already used for login
await userName.fill("rahulshettyacademy");
await signIn.click();
console.log(await page.locator(".cardbody a").textContent());//in this example 4 mobiles are there will try to access multiple elements but css wont accept it 
console.log(await page.locator(".cardbody a").nth(0).textContent());//it will give 1st product or element or else we can use first() instaead of nth(0)
console.log(await cardTitles.first().textContent());
console.log(await cardTitles.nth(1).textContent());
const allTitles=await cardTitles.allTextContents();
console.log(allTitles);

});
