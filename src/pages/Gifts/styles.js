import styled from 'styled-components/native';

export const Container = styled.View`
    padding:10px;
    flex:1;

`;
export const ContainerHeader = styled.View`
    margin:20px 0;
`;
export const ContainerContent = styled.View``;
export const Title = styled.Text`
    font-size:16px;
    color:#444;
`;
export const SmallTitle = styled.Text`
    color:#ddd;
    font-size:14px;
`;
export const ListGifts = styled.View`
    flex-direction:row;
    flex-wrap:wrap
    flex:1;
`;
export const CompanyGift = styled.TouchableOpacity`
    height:100px;
    width:100px;
    border-radius:10px;
`;
export const CompanyImage = styled.Image.attrs({
    resizeMode:'contain',
    alignSelf: 'center',
    justifyContent: 'center',
})`
    width:100%;
    height:100%;
`;
