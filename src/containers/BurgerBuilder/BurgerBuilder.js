import React, { useState } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.5,
  meat: 0.7,
};

const BurgerBuilder = () => {
  const [burgerState, setBurgerState] = useState({
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
  });

  const purchaseHandle = () => {
    setBurgerState({ ...burgerState, purchasing: true });
  };

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    setBurgerState({
      ingredients,
      totalPrice: burgerState.totalPrice,
      purchasable: sum > 0,
    });
    console.log(burgerState);
  };

  const addIngredientHandler = (type) => {
    const oldCount = burgerState.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...burgerState.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = burgerState.totalPrice;
    const newPrice = oldPrice + priceAddition;
    setBurgerState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
    updatePurchaseState(updatedIngredients);
  };
  const removeIngredientHandler = (type) => {
    const oldCount = burgerState.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...burgerState.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = burgerState.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    setBurgerState({ totalPrice: newPrice, ingredients: updatedIngredients });
    updatePurchaseState(updatedIngredients);
  };
  const disabledInfo = {
    ...burgerState.ingredients,
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  return (
    <>
      <Modal show={burgerState.purchasing}>
        <OrderSummary ingredients={burgerState.ingredients} />
      </Modal>
      <Burger ingredients={burgerState.ingredients} />
      <BuildControls
        ordered={purchaseHandle}
        price={burgerState.totalPrice}
        ingredientRemoved={removeIngredientHandler}
        ingredientAdded={addIngredientHandler}
        disabled={disabledInfo}
        purchasable={burgerState.purchasable}
      />
    </>
  );
};

export default BurgerBuilder;
