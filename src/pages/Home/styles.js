import styled from 'styled-components/native';

export const Container = styled.ScrollView`
    flex:1;
    height:100%;
    padding:10px;
`;

export const CardWelcome = styled.View.attrs({
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flex: 6,
    elevation: 5,
})`
    margin-bottom:20px;
    border-radius:5px;
    background:#fff;

`;
export const ContainerImage = styled.ImageBackground.attrs({
    resizeMode: 'cover'
})`
    width:100%;
    height:150px;
`;
export const ContentMarried = styled.View`
    padding:15px;
`;
export const TitleMarried = styled.Text`
    color:#999;
    font-size:14px;
    text-align:center;
    margin:10px 0;
`;
export const Description = styled.Text`
    font-size:13px;
    color:#333;
`;
export const ReadMore = styled.TouchableOpacity`
    align-items:flex-end
    margin:10px 0;
`;
export const ReadText = styled.Text`
    color:#999;
    text-transform:uppercase;
    font-size:14px;
`;

export const CardFeed = styled.View`
    flex:1;
    flex-direction:row;
    align-items:center;
    padding:10px;
    border-radius:5px;
    background:#7230B4;
`;

export const ContentFeed = styled.View`
    flex-direction:column;
    padding:10px;
`;
export const TitleFeed = styled.Text`
    color:#fff;
    font-size:14px;
`;
export const DescriptionFeed = styled.Text`
    color:#fff;
    font-size:12px;
`;

export const TextMore = styled.Text`
    margin-top:20px;
    font-size:14px;
    color:#444;
    text-transform:uppercase;
`;

export const HorizontalMenu = styled.ScrollView`
    flex:2;
`;
export const CardPresence = styled.View.attrs({
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 10,
})` 
    margin:5px;
    background:#fff;
    margin-right:10px;
    align-items:center;
    justify-content:center;
    width:100px;
    height:auto;
    border-radius:10px;
`;
export const TitleIcon = styled.Text`
    margin:5px 0px;
    font-size:12px;
    text-align:center;
`;


