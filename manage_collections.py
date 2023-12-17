import subprocess

def run_generate_script():
    subprocess.run(["python3", "./src/pages/private/landing/col.py"])

def add_generated_code_to_tsx():
    with open("generated_tsx_code.txt", "r") as file:
        generated_code = file.read()

    tsx_file_path = "./src/pages/private/landing/NFTCollectionFetcher.tsx"
    with open(tsx_file_path, "r+") as tsx_file:
        content = tsx_file.read()

        # Разделяем сгенерированный код на четыре части
        parts = generated_code.split("\n\n")
        if len(parts) != 4:
            print("Error: Generated code should be in four parts.")
            return
        useState_code, fetch_data_code, set_data_code, jsx_code = parts

        # Вставка useState кода
        last_use_state_pos = content.rfind("useState<CollectionData>")
        use_state_insert_pos = content.find(");", last_use_state_pos) + 2
        content = content[:use_state_insert_pos] + useState_code + content[use_state_insert_pos:]

        # Вставка кода загрузки данных (fetch_data_code) сразу после "try {"
        try_block_start_pos = content.find("try {") + len("try {")
        content = content[:try_block_start_pos] + "\n" + fetch_data_code + content[try_block_start_pos:]

        # Вставка кода setTestData (set_data_code) после последнего set*Data в функции fetchCollectionData
        set_data_insert_pos = content.rfind("set", 0, content.find("} catch"))
        set_data_insert_pos = content.find(");", set_data_insert_pos) + 2
        content = content[:set_data_insert_pos] + "\n" + set_data_code + content[set_data_insert_pos:]

        # Вставка JSX кода (jsx_code)
        jsx_insert_pos = content.rfind("</Tr>") + len("</Tr>")
        content = content[:jsx_insert_pos] + "\n" + jsx_code + content[jsx_insert_pos:]

        # Перезаписываем файл с новым содержимым
        tsx_file.seek(0)
        tsx_file.write(content)
        tsx_file.truncate()

if __name__ == "__main__":
    print("1: Generate TSX code for a new collection")
    print("2: Add generated code to TSX file")
    choice = input("Enter your choice (1 or 2): ")

    if choice == "1":
        run_generate_script()
    elif choice == "2":
        add_generated_code_to_tsx()
    else:
        print("Invalid choice")
