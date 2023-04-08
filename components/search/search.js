'use client'
import { useEffect, useState } from "react";
import { Autocomplete, Button, Loader, Text } from "@mantine/core";
import { useStyles } from "./search.styles";
import { MultiSelect } from '@mantine/core';
import { IconSearch } from "@tabler/icons"
import { query, collection, getDocs, db } from "@/firebase/firebase";

const Search = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([])

    useEffect(() => {
        async function getRecipes() {
            setLoading(true);
            const q = query(collection(db, "ingredients"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setData(doc.data().ingridients)
            });
            setLoading(false)
        }
        getRecipes();
    }, []);


    const { classes } = useStyles();
    return (
        <>
            <Text
                className={classes.gradient}
                align="center"
                weight={700}
                style={{ fontFamily: "Greycliff CF, sans-serif" }}
            >Find Your Recipe</Text>
            <div className={classes.main}>
                <div className={classes.wrapper}>
                    <div className={classes.root}>
                        {
                            loading ? <Loader size="xl" className={classes.loader}></Loader> : <><MultiSelect
                                className={classes.search}
                                searchable
                                data={data.map((item, key) => ({ label: item, value: item, key: key }))}
                                placeholder="Search for a recipe"
                                size="xl"
                                limit={20}
                                zIndex={1000}
                                transitionProps={{ duration: 150, transition: 'pop-top-left', timingFunction: 'ease' }}

                            ></MultiSelect>
                                <Button className={classes.button} size="xl">
                                    <IconSearch />
                                </Button></>
                        }

                    </div>
                </div>
            </div>
        </>)
}

export default Search