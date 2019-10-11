import styled from 'styled-components/native';

export const Container = styled.View`
    z-index:5;
    flex:1;
    background:#672F9E;
    align-items:center;
    justify-content:center;
    
`;

export const ImageBackground = styled.Image.attrs({
    resizeMode:'cover'
})`
    position:absolute;
    z-index:0;
    top:0;
    bottom:0;
    height:100%;

`;

export const Logo = styled.Image`
    width:250px;
    height:94px;
`;

export const ContainerChoice = styled.View`
`;

export const TitleChoice = styled.Text`
    text-align:center;
    font-size:18px;
    text-transform:uppercase;
    color:#fff;
`;

export const ContainerInput = styled.View` 
    flex-direction:row;
    align-items:center;

`;

export const InputChoice = styled.TextInput`
    border-radius:100px;
    font-size:12px;
    padding:15px;
    background:#fff;
    margin:40px 0px;

`;

export const ButtonChoice = styled.TouchableOpacity`
    width:54px;
    height:54px;
    background:#fff;
    border-radius:100px;
    margin:0px 5px;
    padding:10px;
    align-items:center;
    justify-content:center;
`;

export const SVGButtons = styled.Image.attrs({
    resizeMode:'contain'
})`
    width:20px;
    height:20px;

`;

export const ContainerButton = styled.TouchableOpacity`
    margin:15px 0;
`;

export const TextButton = styled.Text`
    font-size:12px;
    text-decoration:underline;
    color:#fff;
    text-transform:uppercase;
    text-align:center;
`;


