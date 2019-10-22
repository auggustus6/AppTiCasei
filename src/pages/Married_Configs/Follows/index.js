import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import {
    ContainerFollows,
    TitleForm,
    ListFollows,
    FollowView,
    Follow,
    FollowButton,
    FollowText
} from './styles';


function Follows() {
    const userLogged = useSelector(state => state.user);
    return (
        <ContainerFollows>
            <TitleForm>Estou Acompanhando</TitleForm>
            <ListFollows>
                {
                    userLogged.followMarrieds.map(follow => {
                        return (
                            <FollowView key={follow}>
                                <Follow>Carlos e Laura</Follow>
                                <FollowButton>
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


