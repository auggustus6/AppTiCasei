import styled from 'styled-components/native';

export const Container = styled.ScrollView``;

export const ContainerCard = styled.View``;
export const CardHeader = styled.View`
    padding:20px 10px;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
`;
export const TitleHeader = styled.Text`
    flex:1;
    margin-left:10px;
    font-size:10px;
`;

export const ContainerDate = styled.View``;

export const Date = styled.Text`
    font-size:10px;
    color:#333;
`;

export const CardImage = styled.View`
    height:200px;
`;
export const ImageCard = styled.Image.attrs({
    resizeMode: 'cover'
})`
    width:100%;
    height:100%;
`;

export const Description = styled.Text`
    font-size:12px;
    padding:10px;
`;

export const CardFooter = styled.View`
    padding:10px;
`;
export const CardActions = styled.View``;
export const CardComments = styled.View`
    flex-direction:row;
    align-items:center;
    margin-bottom:20px;
`;
export const Avatar = styled.Image`
    background:#ddd;
    border-radius:50px;
    width:30px;
    height:30px;
    margin-right:0px;
`;

export const Author = styled.Text`
    font-size:12px;
    color:#333;
    padding-left:10px;

`;

export const Comment = styled.Text`
    font-size:12px;
    padding-left:10px;
    padding-right:20px;
`;

export const ShowMore = styled.TouchableOpacity`
    
`;
export const ShowText = styled.Text`
        color:#7230B4;
        font-size:12px;
`;

export const ContainerInput = styled.View`
    flex-direction:row;
    align-items:center;
`;

export const InputCommentaries = styled.TextInput.attrs({
    borderBottomColor: '#3333',
    borderBottomWidth: 1,
})`
    flex:1;
    margin-right:10px;
`;
