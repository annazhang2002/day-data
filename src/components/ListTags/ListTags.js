import React from "react";
import "./ListTags.scss";
import { Label, Icon } from 'semantic-ui-react'
import { getColor } from '../../static/util';

export const ListTags = (props) => {
    const { data, onDelete, fieldKey } = props;

    return (
        <div style={{ flexDirection: 'row' }}>
            {data.map((item, index) =>
                <Label key={index} color={getColor(fieldKey)} style={{ paddingTop: '.78571429em', paddingBottom: '.78571429em', marginTop: '5px' }}>
                    {item}
                    <Icon name='delete' onClick={() => onDelete(item)} />
                </Label>)}
        </div>
    )
}
