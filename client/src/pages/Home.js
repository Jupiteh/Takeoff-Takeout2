import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/common/Header'; // Ensure this path is correct based on your project structure

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: white;
  background-image: url('background.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
`;

const HeaderSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 20px;
`;

const Logo = styled.h1`
  font-size: 36px;
  color: #f0ad4e;
  margin-right: auto; // Push the logo to the left
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const NavButton = styled(Link)`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #f0ad4e;
  color: white;
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const SearchBar = styled.input`
  padding: 10px;
  font-size: 18px;
  border: none;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  margin: 20px 0; // Add margin to create space between elements
`;

const SelectionSection = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
  background-color: rgba(43, 62, 80, 0.8);
  padding: 20px;
  border-radius: 10px;
`;

const SelectionContent = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const SelectionTitle = styled.h1`
  margin-bottom: 10px;
  font-size: 36px;
`;

const SelectionText = styled.p`
  margin-bottom: 20px;
  font-size: 18px;
  line-height: 1.5;
`;

const OrderButton = styled(Link)`
  display: inline-block;
  padding: 15px 30px;
  border: none;
  border-radius: 10px;
  background-color: #f0ad4e;
  color: white;
  font-size: 20px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const SelectionImage = styled.img`
  width: 100%;
  max-width: 500px;
  border-radius: 10px;
`;

const RestaurantsSection = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 28px;
`;

const RestaurantList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const RestaurantItem = styled.div`
  flex: 1 1 calc(33% - 20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background-color: #34495e;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const RestaurantImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
  border-radius: 10px;
`;

const RestaurantName = styled.div`
  font-size: 20px;
`;

const InfoSection = styled.div`
  width: 100%;
  max-width: 1200px;
  background-color: rgba(43, 62, 80, 0.8);
  padding: 20px;
  border-radius: 10px;
  color: white;
  margin-top: 40px;
`;

const InfoTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 28px;
`;

const InfoText = styled.p`
  font-size: 18px;
  line-height: 1.5;
`;

const Home = () => {
  return (
    <HomeContainer>
      <HeaderSection>
        <Logo>Takeoff Takeout</Logo>
        <ButtonContainer>
          <NavButton to="/">Accueil</NavButton>
          <NavButton to="/login">Login</NavButton>
        </ButtonContainer>
      </HeaderSection>
      <SearchBar type="text" placeholder="Entrez votre adresse pour trouver des restaurants" />
      <SelectionSection>
        <SelectionContent>
          <SelectionTitle>Ne ratez pas la sélection du jour!</SelectionTitle>
          <SelectionText>Découvrez les plats les plus populaires de nos restaurants partenaires, soigneusement sélectionnés pour vous.</SelectionText>
          <OrderButton to="/search">Commander</OrderButton>
        </SelectionContent>
        <SelectionImage src="selection.jpg" alt="Sélection du jour" />
      </SelectionSection>
      <RestaurantsSection>
        <SectionTitle>Restaurants proches de chez vous</SectionTitle>
        <RestaurantList>
          <RestaurantItem>
            <RestaurantImage src="restaurant1.jpg" alt="Jefe Burger" />
            <RestaurantName>Jefe Burger</RestaurantName>
          </RestaurantItem>
          <RestaurantItem>
            <RestaurantImage src="restaurant2.jpg" alt="Verratti's Pizzas" />
            <RestaurantName>Verratti's Pizzas</RestaurantName>
          </RestaurantItem>
          <RestaurantItem>
            <RestaurantImage src="restaurant3.jpg" alt="Maurice Bappon pasta" />
            <RestaurantName>Maurice Bappon Pasta</RestaurantName>
          </RestaurantItem>
        </RestaurantList>
      </RestaurantsSection>
      <InfoSection>
        <InfoTitle>À propos de Takeoff Takeout</InfoTitle>
        <InfoText>
          Takeoff Takeout est votre destination de choix pour la livraison de repas. Nous nous associons avec les meilleurs restaurants de votre région pour vous offrir une sélection variée de plats délicieux. Notre mission est de rendre votre expérience de commande de repas aussi facile et agréable que possible.
        </InfoText>
      </InfoSection>
    </HomeContainer>
  );
};

export default Home;
