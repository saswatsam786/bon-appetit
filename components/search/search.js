import { useEffect, useState } from "react";
import { Button, Loader, Text, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useStyles } from "./search.styles";
import { MultiSelect } from '@mantine/core';
import { IconSearch } from "@tabler/icons"
import { auth, query, collection, getDocs, db, where, limit, startAt, endAt, orderBy } from "@/firebase/firebase";
import Contents from "../contents/contents";
import { ImageCard } from "../card/card";
import { useAuthState } from "react-firebase-hooks/auth";


const Search = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [documentData, setDocumentData] = useState(null);
    const [randomData, setRandomData] = useState([])
    const [opened, { open, close }] = useDisclosure(false);
    const [user] = useAuthState(auth);

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

        async function getRandomRecipes() {

            try {
                const startIndex = Math.floor(Math.random() * 100000);
                const endIndex = startIndex + 4;

                const docRef = collection(db, "recipes");
                const q = query(docRef, orderBy("id"), startAt(startIndex), limit(3));
                const querySnapshot = await getDocs(q);
                const data = []
                querySnapshot.forEach((doc) => {
                    data.push(doc.data())
                });
                console.log(data)
                setRandomData(data)
            }
            catch (error) {
                console.log(error)
            }

        }

        getRandomRecipes()
    }, []);

    const handleData = async () => {

        const docRef = collection(db, "recipes");
        const q = query(docRef, where("ingredients", "array-contains-any", ingredients));

        getDocs(q)
            .then((querySnapshot) => {
                const data = []
                querySnapshot.forEach((doc) => {
                    const docData = doc.data();
                    const matchedIngredients = ingredients.filter((ingredient) => docData.ingredients.includes(ingredient));
                    if (matchedIngredients.length === ingredients.length) {
                        data.push({ ...docData })
                    }
                });
                setDocumentData(data);
                open()
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });


    }

    console.log(documentData)


    const { classes } = useStyles();
    return (
        <>
            {<Contents opened={opened} close={close} data={documentData}></Contents>}
            <Text
                className={classes.gradient}
                align="center"
                weight={700}
                style={{ fontFamily: "Greycliff CF, sans-serif" }}
            >Find Your Recipe</Text>
            <div className={classes.main}>
                <div className={classes.wrapper}>
                    {user && <div className={classes.root}>
                        {
                            loading ? <Loader size="xl" className={classes.loader}></Loader> : <div style={{ display: "flex", justifyContent: "center", width: "100%" }}><MultiSelect
                                className={classes.search}
                                searchable
                                data={data.map((item, key) => ({ label: item, value: item, key: key }))}
                                placeholder="Search for a recipe"
                                size="xl"
                                onChange={setIngredients}
                                limit={20}
                                zIndex={1000}
                                transitionProps={{ duration: 150, transition: 'pop-top-left', timingFunction: 'ease' }}

                            ></MultiSelect>
                                <Button className={classes.button} size="xl" onClick={handleData}>
                                    <IconSearch />
                                </Button></div>
                        }
                        <div style={{ marginBottom: "-10rem", display: "flex", flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                            {randomData.map((item, key) => (<ImageCard key={key} image={item.image_url || `/default-${Math.floor(Math.random() * 10 % 4)}.jpg`} title={item.name} link={`/recipe/${item.id}`} description={item.description}></ImageCard>))}
                        </div>

                    </div>}
                    {!user && <div style={{ marginBottom: "-10rem", display: "flex", flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                        {randomData.map((item, key) => (<ImageCard key={key} image={item.image_url || `/default-${Math.floor(Math.random() * 10 % 4)}.jpg`} title={item.name} link={`/recipe/${item.id}`} description={item.description}></ImageCard>))}
                    </div>
                    }
                </div>

            </div>
        </>)
}

export default Search