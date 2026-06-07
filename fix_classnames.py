import os
import re

def merge_classnames(text):
    # This regex looks for: className="..." [optional spaces/newlines] className="..."
    # and merges them.
    # It might run multiple times if there are 3 classnames.
    pattern = re.compile(r'className="([^"]*)"(\s*)className="([^"]*)"')
    while pattern.search(text):
        text = pattern.sub(r'className="\1 \3"', text)
    return text

def process_directory(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()

                new_content = merge_classnames(content)

                if content != new_content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Fixed {filepath}")

process_directory(r"c:\Users\Diamond Computer\Desktop\trinetra\src")
