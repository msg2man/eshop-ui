import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import ProductCard from "../ProductCard/ProductCard";
import "./Product.css";
import { useDispatch } from "react-redux";
import { deleteProduct, getAllProducts } from "../../common/Api";
import {useNavigate} from 'react-router-dom';
import CategoryToggleFilter from "../CategoryFilter/CategoryFilter";

const Product = () => {
	const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState('');

	//const [selectedFilter, setSelectedFilter] = useState("ALL");
	const [productsList, setProductsList] = useState([]);

   useEffect(() => {
		if (productsList.length === 0) {
            getAllProducts(setErrorMsg,setProductsList);
            console.log("Response from get all products in product js ", productsList);
            dispatch({type: 'getAllProducts', payload: productsList});
		}
	}, [productsList]);

	// const onSortChange = (e) => {
    //     console.log("Inside sort change");
	// };

	// const handleChange = (event, selectedFilter) => {
	// 	console.log("Inside handleChange");
	// };

    // const searchProduct = (event, selectedFilter) => {
	// 	console.log("Inside searchProduct");
	// };

    const handleDelete = (event) => {
		const productId = event.currentTarget.dataset.productid;
        const response = deleteProduct(setErrorMsg, productId, setProductsList);
        console.log("Inside delete handler response id ", response);
        window.location.reload();
   };

    const handleEdit = (event) => {
		const productId = event.currentTarget.dataset.productid;
        console.log("Inside edit handler product id ", productId);
        sessionStorage.setItem("editProductId", productId);
        navigate('/EditProduct');
	};

	return (
		<Grid container className="container">
			{/* <Filter
				filters={filters}
				handleChange={handleChange}
				selectedFilter={selectedFilter}
				productsList={productsList}
			/> */}
			{/* <Sort sortByFilter={sortByFilter} onSortChange={onSortChange} /> */}

            <CategoryToggleFilter />
			<Grid container className="productsContainer">
				{productsList.map((product) => {
					return (
						<ProductCard
							key={product.id}
							imageUrl={product.imageUrl}
							name={product.name}
							price={product.price}
							description={product.description}
							id={product.id}
							onDeleteHandler={handleDelete}
                            onEditHandler={handleEdit}
						/>
					);
				})}
			</Grid>
		</Grid>
	);
};

export default Product;
