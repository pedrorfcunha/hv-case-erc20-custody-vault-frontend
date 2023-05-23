import {
    Card,
    CardHeader,
    CardBody,
    Heading,
    Stack,
    StackDivider,
    Box,
    Text,
    ListItem,
    UnorderedList,
} from "@chakra-ui/react";

const NotConnected = () => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <Heading size="md">INSTRUCTIONS:</Heading>
                </CardHeader>

                <CardBody>
                    <Stack divider={<StackDivider />} spacing="4">
                        <Box>
                            <Heading size="xs" textTransform="uppercase">
                                Sending tokens
                            </Heading>
                            <Text pt="2" fontSize="sm">
                                <UnorderedList>
                                    <ListItem>
                                        Check if you have any ERC20 tokens
                                        available
                                    </ListItem>
                                    <ListItem>
                                        If necessary, mint HVC tokens directly
                                        on the page
                                    </ListItem>
                                    <ListItem>
                                        Choose how many addresses will receive
                                        the tokens
                                    </ListItem>
                                    <ListItem>
                                        Specify the ERC20 token address being
                                        sent
                                    </ListItem>
                                    <ListItem>
                                        Specify the addresses that will receive
                                        the tokens and the percentage of tokens
                                        each address will receive
                                    </ListItem>
                                </UnorderedList>
                            </Text>
                        </Box>
                        <Box>
                            <Heading size="xs" textTransform="uppercase">
                                Checking transactions
                            </Heading>
                            <Text pt="2" fontSize="sm">
                                In the middle panel, you can check the
                                transactions of tokens held in custody. They
                                will be identified by the transfer ID, amount,
                                sender and receiver.
                            </Text>
                        </Box>
                        <Box>
                            <Heading size="xs" textTransform="uppercase">
                                Register/Approval{" "}
                                <span style={{ color: "#689fd3" }}>
                                    (Trustee/Admin only*)
                                </span>
                            </Heading>
                            <Text pt="2" fontSize="sm">
                                <UnorderedList>
                                    <ListItem>
                                        Only the Trustee/Admin will be able to
                                        manage the trustee panel
                                    </ListItem>
                                    <ListItem>
                                        It is possible to register ERC20 tokens,
                                        sender addresses, and new admins
                                    </ListItem>
                                    <ListItem>
                                        To approve/reject a transaction, select
                                        it by Transfer ID
                                    </ListItem>
                                    <ListItem>
                                        All transactions with the same Transfer
                                        ID will be approved/rejected in batch
                                    </ListItem>
                                </UnorderedList>
                            </Text>
                        </Box>
                    </Stack>
                </CardBody>
            </Card>
        </div>
    );
};

export default NotConnected;
