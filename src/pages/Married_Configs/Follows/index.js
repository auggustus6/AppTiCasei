import React, { useState } from 'react';

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

    return (
        <ContainerFollows>
            <TitleForm>Estou Acompanhando</TitleForm>
            <ListFollows>
                {
                    [1, 2, 3, 4, 5].map(follow => {
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


