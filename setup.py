from setuptools import setup, find_packages

with open('requirements.txt') as f:
	install_requires = f.read().strip().split('\n')

# get version from __version__ variable in theme_manager/__init__.py
from theme_manager import __version__ as version

setup(
	name='theme_manager',
	version=version,
	description='Theme Manger is an frappe app build for customising theme with ERPNext Support',
	author='efeone',
	author_email='sherin@efeone.com',
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
