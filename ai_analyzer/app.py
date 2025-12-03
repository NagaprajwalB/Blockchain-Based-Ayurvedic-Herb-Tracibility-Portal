import streamlit as st
from google import genai
from google.genai import types
import base64
from PIL import Image
import io

def init_client():
    return genai.Client(
        vertexai=True,
        project="she-ai-460201",  
        location="global"
    )

def generate_response(prompt):
    client = init_client()

    si_text1 = """Identify the issues and recommend fixes, 
    helping website owners improve the security, speed, visibility, and usability of their sites."""

    contents = [
        types.Content(
            role="user",
            parts=[types.Part.from_text(text=prompt)]
        )
    ]

    generate_content_config = types.GenerateContentConfig(
        temperature=1,
        top_p=0.95,
        max_output_tokens=1024,
        safety_settings=[
            types.SafetySetting(category="HARM_CATEGORY_HATE_SPEECH", threshold="OFF"),
            types.SafetySetting(category="HARM_CATEGORY_DANGEROUS_CONTENT", threshold="OFF"),
            types.SafetySetting(category="HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold="OFF"),
            types.SafetySetting(category="HARM_CATEGORY_HARASSMENT", threshold="OFF"),
        ],
        system_instruction=[types.Part.from_text(text=si_text1)],
        thinking_config=types.ThinkingConfig(thinking_budget=0),
    )

    response = ""
    for chunk in client.models.generate_content_stream(
        model="gemini-2.5-flash-lite",
        contents=contents,
        config=generate_content_config
    ):
        response += chunk.text or ""
    return response

def analyze_herb_from_image(image_data):
    client = init_client()
    
    herb_analysis_prompt = """You are an expert botanist and herbalist. Analyze this image and identify the herb/plant shown. 
    Provide detailed information including:
    1. Common name and scientific name
    2. Key identifying features
    3. Traditional uses and medicinal properties
    4. Growing conditions and habitat
    5. Any safety considerations or contraindications
    6. How to properly harvest and prepare this herb
    
    Be thorough and accurate in your analysis."""

   
    try:
        if isinstance(image_data, bytes):
            image_bytes = image_data
        else:
            if hasattr(image_data, 'read'):
                image_data.seek(0)  
                image_bytes = image_data.read()
            else:
                buffer = io.BytesIO()
                image_data.save(buffer, format='JPEG', quality=85)
                image_bytes = buffer.getvalue()
        
        if not image_bytes or len(image_bytes) == 0:
            raise ValueError("No image data received")
            
    except Exception as e:
        raise ValueError(f"Error processing image: {str(e)}")

    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text=herb_analysis_prompt),
                types.Part.from_bytes(
                    data=image_bytes,
                    mime_type="image/jpeg"
                )
            ]
        )
    ]

    generate_content_config = types.GenerateContentConfig(
        temperature=0.3,  # Lower temperature for more consistent analysis
        top_p=0.8,
        max_output_tokens=2048,
        safety_settings=[
            types.SafetySetting(category="HARM_CATEGORY_HATE_SPEECH", threshold="OFF"),
            types.SafetySetting(category="HARM_CATEGORY_DANGEROUS_CONTENT", threshold="OFF"),
            types.SafetySetting(category="HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold="OFF"),
            types.SafetySetting(category="HARM_CATEGORY_HARASSMENT", threshold="OFF"),
        ],
        thinking_config=types.ThinkingConfig(thinking_budget=0),
    )

    response = ""
    for chunk in client.models.generate_content_stream(
        model="gemini-2.5-flash-lite",
        contents=contents,
        config=generate_content_config
    ):
        response += chunk.text or ""
    return response

st.set_page_config(page_title="Gemini Web Optimizer", layout="wide")

st.title("🌐 AI Support for Wild Collectors !!")
st.caption("")

tab1, tab2 = st.tabs(["📝 Text Analysis", "🌿 Herb Scanner"])

with tab1:
    prompt = st.text_area("🔍 Enter your details or issues below:", height=150)

    if st.button("🚀 Generate Recommendations"):
        if prompt.strip():
            with st.spinner("Analyzing and generating recommendations..."):
                try:
                    result = generate_response(prompt)
                    st.subheader("💡 Recommendations")
                    st.write(result)
                except Exception as e:
                    st.error(f"Error: {e}")
        else:
            st.warning("⚠️ Please enter some text to analyze.")

with tab2:
    st.subheader("🌿 Herb Identification Scanner")
    st.write("Take a photo of a herb or plant to get detailed information about it.")
    
    captured_image = st.camera_input("📸 Take a photo of the herb/plant")
    
    if captured_image is not None:
        st.image(captured_image, caption="Captured Image", width=300)
        
        if st.button("🔍 Analyze Herb", key="analyze_herb"):
            with st.spinner("Analyzing herb image..."):
                try:
                    analysis_result = analyze_herb_from_image(captured_image)
                    
                    st.subheader("🌿 Herb Analysis Results")
                    st.write(analysis_result)
                    
                except Exception as e:
                    st.error(f"Error analyzing image: {e}")
    
    st.write("---")
    st.write("Or upload an image file:")
    uploaded_file = st.file_uploader("Choose an image file", type=['png', 'jpg', 'jpeg'])
    
    if uploaded_file is not None:
        image = Image.open(uploaded_file)
        st.image(image, caption="Uploaded Image", width=300)
        
        if st.button("🔍 Analyze Uploaded Herb", key="analyze_uploaded"):
            with st.spinner("Analyzing uploaded herb image..."):
                try:
                    analysis_result = analyze_herb_from_image(uploaded_file)
                    
                    st.subheader("🌿 Herb Analysis Results")
                    st.write(analysis_result)
                    
                except Exception as e:
                    st.error(f"Error analyzing image: {e}")

