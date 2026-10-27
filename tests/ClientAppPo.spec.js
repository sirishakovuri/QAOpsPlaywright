const { test, expect } = require("@playwright/test")
const { POManager } = require("../pageobjects/POManager");
//Json->string->js object
const dataset= JSON.parse(JSON.stringify(require("../Utils/placeorderTestdata")));  
  for(const [index, data] of dataset.entries())
  {
  test(`Client app login for ${data.productName ?? `product ${index + 1}`}` ,async({page})=>
  {
    const poManager = new POManager(page);
    const products= page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username,data.password);
    const dashboardPage= poManager.getDashboardPage();
    await dashboardPage.searchProductAddcart(data.productName);
    await dashboardPage.navigateToCart();
    await page.locator("div li").first().waitFor({ state: "visible" });
    const bool= await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=checkout").click();
    await page.locator("[placeholder='Select Country']").pressSequentially("ind",{delay:100});
    const dropdown=page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for(let i=0; i<optionsCount; ++i)
    {
        text = await dropdown.locator("button").nth(i).textContent();             
          if(text=== " India")
          {
            await dropdown.locator("button").nth(i).click();
            break;
          }
            
        }
    
    await expect(page.getByRole("textbox").nth(4)).toHaveValue(username);
    await page.locator(".btnn").click();
    await expect (page.locator(".hero-primary")).toHaveText("Thankyou for the order.");
    console.log("Thank you for the order.");


})
  }