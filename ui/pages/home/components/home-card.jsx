import { 
  Box, 
  Button, 
  Text,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Image,
  Avatar,
  IconButton,
  Collapse,
  useColorModeValue
} from "@chakra-ui/react";
import React, {useState} from 'react';
import { FaHeart } from "@react-icons/all-files/fa/FaHeart";
import { FaShareAlt } from "@react-icons/all-files/fa/FaShareAlt";
import { FaChevronDown } from "@react-icons/all-files/fa/FaChevronDown";



export function HomeCard({imageSrc}) {

  const [expanded, setExpanded] = useState(false);



  return (
    <Card
      maxW="md"
      boxShadow="lg"
      borderRadius="lg"
      overflow="hidden"
      bg={useColorModeValue("white", "gray.800")}
    >

      {/* Header de la card*/}
      <CardHeader display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Avatar name="Recipe" bg="red.500" />
          <Box ml="3">
            <Text fontWeight="bold">Elavoracion</Text>
            <Text fontSize="sm" color="gray.400">
              Tortilla clasica
            </Text>
          </Box>
        </Box>
        <IconButton icon={<FaShareAlt />} variant="ghost" />
      </CardHeader>


      {/* imagen de la tortilla de la card*/}
      <Image src={imageSrc} alt="iamgen de modulo." objectFit="cover" />


      {/* body de la card*/}
      <CardBody>
        <Text fontSize="sm" color="gray.400">
          Elavoracion de la tortilla clasica, redonda y calientita.
        </Text>
      </CardBody>


      {/* pie de la card*/}
      <CardFooter display="flex" justifyContent="space-between" alignItems="center">
        <IconButton icon={<FaHeart />} colorScheme="red" variant="ghost" />
        <Button
          rightIcon={<FaChevronDown />}
          onClick={() => setExpanded(!expanded)}
          variant="ghost"
        >
          {expanded ? "Show Less" : "Show More"}
        </Button>
      </CardFooter>


      {/* expancion de los botones de la card*/}
      <Collapse in={expanded}>
        <CardBody>
          <Text fontWeight="bold">Method:</Text>
          <Text fontSize="sm">
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
            minutes.
          </Text>
          <Text fontSize="sm">
            Heat oil in a paella pan, add chicken, shrimp, and chorizo, and cook until lightly
            browned. Add saffron broth, then rice, and let cook until done.
          </Text>
          <Text fontSize="sm">Set aside for 10 minutes, then serve and enjoy.</Text>
        </CardBody>
        <CardFooter display="flex" justifyContent="space-between" alignItems="flex-end">
        <Button
            /* aqui tendra que haver otra funcion para ir a los modulos  */
            variant="ghost"
          >
            Enter
          </Button>
        </CardFooter>
      </Collapse>
    </Card>
  );
}
