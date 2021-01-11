import styled from "styled-components";
import { fonts, screen } from "../../styles/appStyles";

export const FarmCardContainer = styled.div`
    width: 33%;
    border: ${(props) => props.theme.style.mainBorder};
    border-radius: 25px;
    padding: 20px;
    color: ${(props) => props.theme.style.primaryFontColor};
    background-color: ${(props) => props.theme.style.lightBackground};
    display: -ms-grid;
    display: grid;
    font-family: ${fonts.contentFont};
    margin: 10px 0;


    @media(max-width: ${screen.lg}px){
        width: 49%;
    }

    @media(max-width: ${screen.md}px){
        width: 100%;
    }

    .farm_card_title {
        font-size: 18px;
        font-weight: bold;
        text-align: left;
        margin-bottom: 20px;
    }

    .farm_card_content{
        display: grid;
        display: -ms-grid;
        -ms-grid-columns: 33% 33% 33%;
        grid-template-columns: 33% 33% 33%;
        grid-template-areas: 
        "earning staked unstaked"
        "claimable pool value";

        .card_property_section{
            text-align: left;
            padding: 20px;

            .card_property_title {
                font-weight: bold;
                font-size: 16px;
            }
            .card_property_value {
                font-size: 14px;
                margin-top: 10px;
            }
        }
    
        .farm_earning{
            grid-area: earning;
        }
        .farm_staked{
            grid-area: staked;
        }
        .farm_claimable{
            grid-area: claimable;
        }
        .farm_unstaked{
            grid-area: unstaked;
        }
        .farm_pool_percentage{
            grid-area: pool;
        }
        .farm_value{
            grid-area: value;
        }
    }
`

export const CardInputContainer = styled.div`

position: relative;
width: 100%;
.card_amount_input{
    width: 100%;
    height: 40px;
    border-radius: 6px;
    font-size: 16px;
    font-weight: bold;
    padding: 10px;
}
.card_max_button {
    position: absolute;
    top: 7px;
    right: 10px;
    height: 25px;
    width: 50px;
    font-size: 14px;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;

}
`

export const FarmCardButtonsContainer = styled.div`
     display: -webkit-box;
     display: -ms-flexbox;
     display: flex;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;

    .farm_card_button{
        width: 49%;
        background-color: ${(props) => props.theme.style.highlight};
        border-radius: 8px;

    }
`

export const UnderlyingBalanceContainer = styled.div`
    text-align: left;
    margin: 10px 0;
    .underlying_balance_label {
        font-size: 16px;
        font-weight: bold;
    }
    .underlying_balance_value {
        font-size: 16px;
    }
`

export const FarmGroupContainerWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    -webkit-box-pack: justify;
    justify-content: space-between;    
    -ms-flex-pack: justify;

    @media(max-width: ${screen.md}px){
        flex-direction: column;
    }
`


export const StakedAssetsTitle  = styled.h2`
    font-size: 18px;
    font-weight: bold;
    margin-top: 25px;
    font-family: ${fonts.headerFont};
    border: ${(props) => props.theme.style.mainBorder};
    box-shadow: ${(props) => props.theme.style.panelBoxShadow};
    padding: 10px;
    background-color: ${(props) => props.theme.style.highlight};

`

export const NoFarmSummariesFound = styled.div`
    font-family: ${fonts.headerFont};
    font-size: 18px;
    border: ${(props) => props.theme.style.mainBorder};
    padding: 10px;
    text-align: center;


`
