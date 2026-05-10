// export const backendBaseUrl = "http://localhost:3000"
export const backendBaseUrl = "https://e-commerce-site-238239922470.asia-south1.run.app"

export const loginEndpoint = `${backendBaseUrl}/auth/login`
export const signupEndpoint = `${backendBaseUrl}/auth/signup`

export const getItemsEndpoint = `${backendBaseUrl}/user/all-items`
export const addItemToCartEndpoint = `${backendBaseUrl}/user/add-to-cart`
export const getItemsInCartEndpoint = `${backendBaseUrl}/user/cart`
export const updateCartItemQuantityEndpoint = `${backendBaseUrl}/user/update-cart-quantity`
export const deleteCartItemEndpoint = `${backendBaseUrl}/user/delete-cart`