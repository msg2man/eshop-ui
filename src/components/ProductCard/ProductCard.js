import React from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import "./ProductCard.css";

const ProductCard = ({
	imageUrl,
	name,
	price,
	description,
    id,
	onDeleteHandler,
    onEditHandler
}) => {
	const handleBuyClick = () => {
		alert("Buy functionality to be implemented");
	  };
	return (
		<Card xs={12} sm={6} md={4} className="productWrapper">
			<CardMedia
				className="productImage"
				image={imageUrl}
				title={name}
			/>
			<CardContent className="cardContent">
				<Container className="nameAndPrice">
					<Typography gutterBottom variant="h5" component="span">
						{name}
					</Typography>
					<Typography className="productPrice" variant="body1" component="span">
						{`INR ${price}`}
					</Typography>
				</Container>
				<Typography variant="body2" color="textSecondary">
					{description}
				</Typography>
			</CardContent>
			<CardActions className="cardActions">
				<Button size="small" variant="contained" onClick={handleBuyClick}>
                  BUY
				</Button>
				<Box className="editAndDelete">
					<EditIcon 
                        variant="filled" 
                        data-productid={id}
						onClick={onEditHandler}
                    />
					<DeleteIcon
						variant="filled"
						data-productid={id}
						onClick={onDeleteHandler}
					/>
				</Box>
			</CardActions>
		</Card>
	);
};

ProductCard.propTypes = {
	imageUrl: PropTypes.string,
	name: PropTypes.string,
	description: PropTypes.string,
	price: PropTypes.number,
	onDeleteHandler: PropTypes.func,
    onEditHandler: PropTypes.func,
	id:  PropTypes.string,
};

export default ProductCard;
