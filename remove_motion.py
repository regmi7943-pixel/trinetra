import os
import re

def remove_motion_props(text):
    props = ['initial', 'animate', 'exit', 'transition', 'whileHover', 'whileTap', 'whileInView', 'viewport', 'layoutId', 'layout', 'drag', 'dragConstraints', 'dragElastic', 'onDragEnd', 'mode']
    
    for prop in props:
        # Remove boolean props like `layout` or `layout `
        text = re.sub(rf'\b{prop}(?=\s|>)', '', text)
        
        # Remove string props like `mode="wait"`
        text = re.sub(rf'\b{prop}=["\'][^"\']*["\']', '', text)
        
        # Remove brace props like `initial={{ x: 0 }}`
        # We need to find `prop={` and then match balanced braces
        start_idx = 0
        while True:
            match = re.search(rf'\b{prop}\s*=\s*{{', text[start_idx:])
            if not match:
                break
            
            # Found the start of `prop={`
            abs_start = start_idx + match.start()
            brace_start = start_idx + match.end() - 1
            
            # Find the closing brace
            brace_count = 0
            abs_end = -1
            for i in range(brace_start, len(text)):
                if text[i] == '{':
                    brace_count += 1
                elif text[i] == '}':
                    brace_count -= 1
                    if brace_count == 0:
                        abs_end = i
                        break
            
            if abs_end != -1:
                # remove it
                text = text[:abs_start] + text[abs_end+1:]
                # don't advance start_idx because string shifted
            else:
                start_idx = abs_start + 1

    return text

def remove_motion_from_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # remove imports
    content = re.sub(r'import\s+{\s*[^}]*\b(?:motion|AnimatePresence)\b[^}]*}\s+from\s+["\']motion/react["\'];?\n?', '', content)
    content = re.sub(r'import\s+[^;]+from\s+["\']motion/react["\'];?\n?', '', content)

    # replace <motion.div with <div
    content = re.sub(r'<\s*motion\.([a-zA-Z0-9]+)', r'<\1', content)
    content = re.sub(r'<\/\s*motion\.([a-zA-Z0-9]+)', r'</\1', content)
    
    # remove <AnimatePresence> and </AnimatePresence>
    content = re.sub(r'<\s*AnimatePresence[^>]*>', '', content)
    content = re.sub(r'<\/\s*AnimatePresence\s*>', '', content)

    # remove motion props
    content = remove_motion_props(content)

    if original != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

def process_directory(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                remove_motion_from_file(os.path.join(root, file))

process_directory(r"c:\Users\Diamond Computer\Desktop\trinetra\src")
