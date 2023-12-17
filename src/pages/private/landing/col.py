import re

def format_collection_name(name):
    name = re.sub(r'[^a-zA-Z0-9 ]', '', name)
    parts = name.split()
    formatted_name = parts[0].lower() + ''.join(word.capitalize() for word in parts[1:])
    return formatted_name

def generate_tsx_code_for_collection(collection_name, contract_address, image_url):
    formatted_name = format_collection_name(collection_name)

    state_hook = f"""
    const [{formatted_name}Data, set{formatted_name.capitalize()}Data] = useState<CollectionData>({{name: '', totalSupply: '', imageUrl: '', totalSold: 0, floorPrice: ''}});\n"""

    fetch_data_code = f"""
                const {formatted_name}CollectionTotalSupply = await fetchTotalSupply("{contract_address}");
                const {formatted_name}Collection = await contract.collectionsData("{contract_address}");

                set{formatted_name.capitalize()}Data({{
                    name: '{collection_name}',
                    totalSupply: {formatted_name}CollectionTotalSupply,
                    imageUrl: '{image_url}',
                    totalSold: {formatted_name}Collection.totalSold.toNumber(),
                    floorPrice: ethers.utils.formatUnits({formatted_name}Collection.floorPrice, 'ether')
                }});\n"""

    jsx_row = f"""
            <Tr>
                <Td>
                    <Flex $style={{{{vAlign: "center", gap: "1rem"}}}}>
                        <Flex $style={{{{maxW: "5rem"}}}}>
                            <Image $style={{{{radius: "1rem"}}}} src={{{formatted_name}Data.imageUrl}}/>
                        </Flex>
                        <Heading level={{4}}>{{{formatted_name}Data.name}}</Heading>
                    </Flex>
                </Td>
                <Td><Span>{{{formatted_name}Data.totalSupply}}</Span></Td>
                <Td><Span>{{{formatted_name}Data.totalSold}}</Span></Td>
                <Td><Span>{{{formatted_name}Data.floorPrice}} AMBER</Span></Td>
                <Td><Span>0</Span></Td>
            </Tr>"""

    final_ts_code = state_hook + fetch_data_code + jsx_row

    with open("generated_tsx_code.txt", "w") as file:
        file.write(final_ts_code)

    return "TSX code generated and saved to generated_tsx_code.txt"

if __name__ == "__main__":
    collection_name = input("Enter the collection name: ")
    contract_address = input("Enter the contract address: ")
    image_url = input("Enter the image URL: ")

    result = generate_tsx_code_for_collection(collection_name, contract_address, image_url)
    print(result)
