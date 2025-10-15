from setuptools import setup, find_packages

with open("README.md", "r", encoding="utf-8") as f:
    page_description = f.read()

# Requirements will be empty for this project as it's not a distributable package
# The actual dependencies are managed per component (backend/frontend)
requirements = []

setup(
    name="doces-giamor",
    version="1.0.0",
    author="Roberton003",
    author_email="roberton003@example.com",
    description="Sistema completo de gestão para confeitarias com controle de custos e dashboard analítico",
    long_description=page_description,
    long_description_content_type="text/markdown",
    url="https://github.com/Roberton003/doceslucro",
    packages=find_packages(),
    install_requires=requirements,
    python_requires='>=3.8',
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: End Users/Desktop",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Programming Language :: Python :: 3.12",
        "Topic :: Office/Business :: Financial :: Accounting",
        "Topic :: Internet :: WWW/HTTP :: Dynamic Content",
    ],
    keywords="confeitaria gestão custos dashboard django react",
    project_urls={
        "Bug Reports": "https://github.com/Roberton003/doceslucro/issues",
        "Source": "https://github.com/Roberton003/doceslucro",
        "Documentation": "https://github.com/Roberton003/doceslucro#readme",
    },
)