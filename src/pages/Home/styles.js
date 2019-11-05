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
    border-radius:10px;
    background:#fff;

`;
export const ContainerImage = styled.ImageBackground.attrs({
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
})`
    width:100%;
    height:250px;
    justify-content:center;
    align-items:center;
`;

export const BannerTime = styled.View.attrs({
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
})`
    flex-direction:row;
    align-items:center;
    justify-content:center;
    background:#7230B4;
    padding:5px 0px;
`;

export const TextTime = styled.Text`
    font-size:18px;
    margin-right:15px;
    color:#fff;
`;

export const Time = styled.Text`
    border:2px solid #7230B4;
    background:#7230B4;
    border-radius:10px;
    padding:5px 20px;
    font-size:52px;
    color:#fff;
    font-weight:bold;
    align-items:center;
    justify-content:center;
`;

export const Days = styled.Text`
    font-size:14px;
    margin-left:15px;
    color:#fff;
`;


export const ContentMarried = styled.View`
    padding:15px;
`;
export const TitleMarried = styled.Text`
    color:#fff;
    font-size:18px;
    text-shadow:2px 2px 10px #333;
    text-align:center;
    margin:10px 0;
    text-transform:uppercase;

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
    height:90%;
    border-radius:10px;
`;
export const TitleIcon = styled.Text`
    margin:5px 0px;
    font-size:12px;
    text-align:center;
`;


