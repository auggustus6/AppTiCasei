import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    ContainerFollows,
    TitleForm,
    ListFollows,
    FollowView,
    Follow,
    FollowButton,
    FollowText
} from './styles';
import { async_getMarried } from '~/store/actions/marriedAction';


function Follows() {
    const userLogged = useSelector(state => state.user);
    const dispatch = useDispatch();

    

    handleMarried = async(code) => {
        dispatch(async_getMarried(code))    
    }

    return (
        <ContainerFollows>
            <TitleForm>Estou Acompanhando</TitleForm>
            <ListFollows>
                {
                    userLogged.followMarrieds &&
                    userLogged.followMarrieds.map(follow => {
                        return (
                            <FollowView key={follow._id}>
                                <Follow>{follow.title}</Follow>
                                <FollowButton onPress={() => handleMarried(follow.uniqueCode)}>
                                    <FollowText>Visualizar</FollowText>
                                </FollowButton>
                            </FollowView>
                        )
                    })
                }
            </ListFollows>
        </ContainerFollows>
    );
}


export default Follows;


