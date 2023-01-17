import { Box, Button, Center, Heading, Image, Text, Tooltip } from "@chakra-ui/react";
import React, { useState } from "react";
import { ExternalIcon } from "./Link";

/**
 * 
 * @param {import("@chakra-ui/react").CSSObject} hover
 * @returns 
 */
export function Mention({ children, hover, onClick }) {
    return (
        <Box onClick={onClick} display="inline" bgColor="#3e4372" paddingTop="0.5" paddingBottom="1" marginX={0.2} paddingX={1} borderRadius={4} _hover={{
            bgColor: "#5865f2",
            ...hover
        }} cursor="pointer">
            {children}
        </Box>
    )
}

export function SlashCommand({ children }) {
    return (
        <Mention>
            /{children}
        </Mention>
    )
};

// eslint-disable-next-line
const Invite = "https://discord.com/oauth2/authorize?client_id=942858850850205717&permissions=3072&scope=applications.commands%20bot";
export function UserMention({ children, isFormsBot, avatar, text }) {
    if (children === "Forms") isFormsBot = true;
    if (avatar == null && isFormsBot) avatar = "https://cdn.discordapp.com/avatars/942858850850205717/35f7b68f8f64be0df28554968531bcd2?size=4096";
    const [hidden, setHidden] = useState(true);
    const HandleInteraction = () => {
        if (isFormsBot) setHidden(!hidden);
    }
    return (
        <Tooltip pointerEvents="all" isOpen={!hidden} zIndex={10000} backgroundColor="#292b2f" padding={5} borderRadius={5} ml={2} label={
            <Box>
                <Box paddingTop='4px' paddingRight='4px' cursor='pointer' float="right" onClick={HandleInteraction}>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                        <path fill="#b9bbbe" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z" />
                    </svg>
                </Box>
                <Center>
                    <Image
                        src={avatar}
                        width={12}
                        mb={2}
                        borderRadius="full"
                    />
                </Center>
                <Box pb={2} textAlign="center">
                    <Center>
                        <Heading size="md">Forms<Text display="inline" color="#b9bbbe">#5609</Text></Heading>
                        <Box display='inline-flex' backgroundColor='#5865F2' borderRadius='.1875rem' ml='4px' height='.9375rem' width='39px'>
                            <Tooltip hasArrow label={
                                <Box>
                                    Verified Bot
                                </Box>
                            } placement='top' shouldWrapChildren bg="#18191c" borderRadius={6} padding='6px 12px'>
                                <svg width="16" height="16" viewBox="0 0 16 15.2"><path d="M7.4,11.17,4,8.62,5,7.26l2,1.53L10.64,4l1.36,1Z" fill="currentColor"></path></svg>
                            </Tooltip>
                            <Text fontFamily='Whitney Bold' fontSize='.625rem'>BOT</Text>
                        </Box>
                    </Center>
                    <Text>Create custom in-app modals and send submissions to a channel using webhooks.</Text>
                </Box>
                <a href={Invite} target="_blank" rel="noreferrer noopener">
                    <Center>
                        <Button variant="primary" width="full" rightIcon={<ExternalIcon color="white" />}>Add to Server</Button>
                    </Center>
                </a>
            </Box>
        } shouldWrapChildren>
            <Mention hover={{ textDecoration: "underline" }} onClick={HandleInteraction}>
                {(avatar != null && !isFormsBot) && <Image
                    src={avatar}
                    width={5}
                    display="inline"
                    borderRadius="full"
                    mr={1}
                    mb="0.5"
                />}
                <Text display="inline" textColor={text ?? "currentcolor"}>@{children}</Text>
            </Mention>
        </Tooltip>
    );
}
