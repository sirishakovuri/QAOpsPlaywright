class DashboardPage
{
    constructor(page)
    {
    this.products = page.locator(".card-body b");
    this.productsText= page.locator(".card-body b");
    this.cart= page.locator("[routerlink*='cart']");

    }

    async searchProductAddcart(productName)
    {
      const titles=await this.productsText.allTextContents();
      console.log(titles);
      
        const count=this.products.count();
        for(let i=0;i<count;++i)
        {
        if(await this.products.nth(1).locator("b").textContent===productName)
        {
          page.getByRole('button',{name: 'Add To Cart'}).nth(1);
          
        }
      }
    }

    async navigateToCart()
    {
      await this.cart.click();
    }
}
module.exports = { DashboardPage };