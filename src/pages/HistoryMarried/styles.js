import styled from 'styled-components/native';

export const Container = styled.ScrollView`
    padding:20px;
    flex:1;
`;
export const ContainerImage = styled.ImageBackground.attrs({
    resizeMode: 'cover'
})`
    width:100%;
    height:200px;
`;
export const TitleMarried = styled.Text`
    font-size:16px;
    color:#7230B4;
    text-align:center;
    margin:20px 0px;
`;
export const Description = styled.Text`
    line-height:22px;
    font-size:14px;
`;
export const ContainerGallerys = styled.ScrollView`
    margin:40px 0px;
`;
export const ClickImage = styled.TouchableOpacity`
    width:100px;
    height:100px;
    border-radius:100px;
    margin-right:10px;
`;
export const Image = styled.Image.attrs({
    resizeMode: 'cover'
})`
    width:100%;
    height:100%;
`;
