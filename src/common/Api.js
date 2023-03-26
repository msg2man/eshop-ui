export const handleSignin = async (formData, setErrorMsg) => {
    //alert("Inside signin");
    const { username, password } = formData;
    
    try {
        const response = await fetch('http://localhost:8080/api/auth/signin', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            username: username,
            password: password
            })
        });
        
        if (!response.ok) {
            throw new Error('Invalid username or password');
        }
        
        const data = await response.json();
        console.log("The response is ", data);

        // Get the role of the signed in user
        const responseUser = await fetch('http://localhost:8080/api/users', {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${data.token}`,
            },
        });

        const dataUser = await responseUser.json();
        console.log("The response for users api is ", dataUser);
        const user = dataUser.find(user => user.email === username);
        const role = user?.roles[0]?.name; // use optional chaining to handle possible null/undefined values
        console.log(role);
        let isCurrentUserAdmin = false;
        if (role == 'ADMIN') {
            isCurrentUserAdmin = true;
        }
        const userObject = {username: user.email, token: data.token, isAuthenticated: true, isAdmin: isCurrentUserAdmin };
        sessionStorage.setItem("currentUser", JSON.stringify(userObject));
        const storedUserObject = JSON.parse(sessionStorage.getItem("currentUser"));
        console.log("The stored user is ", storedUserObject);

        // also store the token
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('isAdmin', isCurrentUserAdmin);

    } catch (error) {
      setErrorMsg(error.message);
    }
  };

export const handleSignup = async (formData, isAdmin, setErrorMsg) => {
    //alert("Inside signup");
    const { firstName, lastName, email, password, confirmPassword, phoneNumber } = formData;
    if (password !== confirmPassword) {
        alert("Password and confirm password do not match, please re-enter.");
        return;
    }
    let role = "admin";
    if (isAdmin == false) {
        role = "user";
    }
    
    try {
        const response = await fetch('http://localhost:8080/api/auth/signup', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                role: [`${role}`],
                password: password,
                firstName: firstName,
                lastName: lastName,
                contactNumber: phoneNumber
            })
        });
        
        console.log("The response for signup is ", response);
        if (!response.ok) {
            throw new Error('Invalid details for signup');
        }

    } catch (error) {
      setErrorMsg(error.message);
    }
};
  
export const handleAddProduct = async (formData, category, setErrorMsg) => {
    //alert("Inside add product");
    const {name, manufacturer, price, availableItems, imageUrl, description} = formData;
    
    try {
        const token = sessionStorage.getItem('token');
        const response = await fetch('http://localhost:8080/api/products', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                id: "ABC123",
                name: name,
                category: category.value,
                manufacturer: manufacturer,
                price: price,
                availableItems: availableItems,
                imageUrl: imageUrl,
                description: description
            })
        });
        
        console.log("The response for add product is ", response);
        if (!response.ok) {
            throw new Error('Invalid details for add product');
        }

    } catch (error) {
      setErrorMsg(error.message);
    }
};

export const getAllProducts = async (setErrorMsg, setProductList) => {
    //alert("Inside getAllProducts");
    let response;
    try {
        response = await fetch('http://localhost:8080/api/products', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            }
        });
        //console.log("The response for get all product is ", response);
        
        if (!response.ok) {
            throw new Error('Get all products returned error');
        }
        else {
            response = await response.json();
            console.log("The response for get all product is ", response);
            setProductList([...response])
        }
    } catch (error) {
        setErrorMsg(error.message);
    }
    return response;
};

export const deleteProduct = async (setErrorMsg, id, setProductList) => {
    //alert("Inside deleteProduct");
    console.log("The product id in deleteProduct is", id);
    let response;
    const token = sessionStorage.getItem('token');
    console.log("The token in deleteProduct is", token);
    try {
        response = await fetch(`http://localhost:8080/api/products/${id}`, {
            method: 'DELETE',
            mode: "cors",
            credentials: "same-origin", 
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            }
        });
 
        if (!response.ok) {
            throw new Error('Delete product returned error');
        }
        else {
            response = await response.json();
            console.log("The response for delete product is ", response);
            setProductList([...response])
        }
    } catch (error) {
        setErrorMsg(error.message);
    }
    return response;
};

export const editProduct = async (formData, categoryy, id, setErrorMsg) => {

    console.log("The product id in editProduct is", id);
    let response;
    const token = sessionStorage.getItem('token');
    console.log("The token in editProduct is", token);

    const {name, category, manufacturer, price, availableItems, imageUrl, description} = formData;

    try {
        response = await fetch(`http://localhost:8080/api/products/${id}`, {
            method: 'PUT',
            mode: "cors",
            credentials: "same-origin", 
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                id: `${id}`,
                name: name,
                category: category,
                manufacturer: manufacturer,
                price: price,
                availableItems: availableItems,
                imageUrl: imageUrl,
                description: description
            })
        });
 
        if (!response.ok) {
            throw new Error('Edit product returned error');
        }
        else {
            response = await response.json();
            console.log("The response for delete product is ", response);
        }
    } catch (error) {
        setErrorMsg(error.message);
    }
    return response;
}

export const getProduct = async (setErrorMsg, id) => {

    console.log("The product id in getProduct is", id);
    let response;
    const token = sessionStorage.getItem('token');
    console.log("The token in getProduct is", token);

    try {
        response = await fetch(`http://localhost:8080/api/products/${id}`, {
            method: 'GET',
            mode: "cors",
            credentials: "same-origin", 
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            }
        });
 
        if (!response.ok) {
            throw new Error('Get product returned error');
        }
        else {
            response = await response.json();
            console.log("The response for get product is ", response);
        }
    } catch (error) {
        setErrorMsg(error.message);
    }
    return response;
}

  