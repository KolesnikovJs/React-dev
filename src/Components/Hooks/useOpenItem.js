import { useState } from 'react';


export function UseOpenItem() {
    const [openItem, setOpenItem] = useState(null);
    return { openItem, setOpenItem };
} 