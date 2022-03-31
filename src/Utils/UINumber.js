import React, {Text} from 'react';
import numeral from 'numeral';


const UINumber = ({ format, children }) => {

    return(
        <Text>
        {numeral(children).format(format)}
        </Text>
    )

}

export default UINumber;