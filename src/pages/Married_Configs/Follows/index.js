import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    ContainerFollows,
    ContainerTitleFollows,
    TitleForm,
    ListFollows,
    FollowView,
    Follow,
    FollowButton,
    FollowText
} from './styles';
import { async_getMarried } from '~/store/actions/marriedAction';
import { userfollowMarried } from '~/store/actions/userAction'
import { Switch } from 'react-native-gesture-handler';




function Follows() {
    const userLogged = useSelector(state => state.user);
    const married = useSelector(state => state.married);
    const dispatch = useDispatch();
    const [followMarried, setFollow] = useState(false);

    useEffect(() => {
        verifyUserIntoMarried();
    }, [userLogged])

    handleFollow = () => {
        dispatch(userfollowMarried(married.dataMarried.id));
        if (followMarried) setFollow(false);
        else setFollow(true);
    }

    handleMarried = (code) => {
        dispatch(async_getMarried(code))

    }

    verifyUserIntoMarried = () => {
        if (userLogged.idUser && userLogged.followMarrieds.length) {
            userLogged.followMarrieds.forEach(u => {
                if (u.id === married.dataMarried.id) {
                    setFollow(true)
                }
                else {
                    setFollow(false)
                }
            })
        }
    }

    return (
        <ContainerFollows>
            <ContainerTitleFollows>
                <TitleForm>Seguir</TitleForm>
                <Switch
                    // thumbColor="#672F9E"
                    // trackColor={{false: '#ddd', true: '#672F9E'}}
                    value={followMarried}
                    onValueChange={handleFollow}
                />
            </ContainerTitleFollows>
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


