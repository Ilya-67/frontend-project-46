### Hexlet tests and linter status:
[![Actions Status](https://github.com/Ilya-67/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/Ilya-67/frontend-project-46/actions)
<a href="https://codeclimate.com/github/Ilya-67/frontend-project-46/maintainability"><img src="https://api.codeclimate.com/v1/badges/628be529b32fe771e212/maintainability" /></a>
<a href="https://codeclimate.com/github/Ilya-67/frontend-project-46/test_coverage"><img src="https://api.codeclimate.com/v1/badges/628be529b32fe771e212/test_coverage" /></a>
<h1>Project "File diff generator"</h1>
<h3>Description</h3>
<p>This project was implemented as part of the JS programming training program. The result of the program's operation is the generation of a file of differences between two files transferred in the format JSON or YAML(yml). When forming a request, you must specify the format in which the user wants to receive a response: stylish, plain or JSON. If the format is not specified, the program will return the answer in the stylish format (specified by default).</p>
<p>When starting the program, at the user's choice, an absolute or relative path to the location where the analyzed files are stored can be specified.</p>
<p>The program can be used as a library.</p>
<h3>Requirement</h3>
<p>For the package to work correctly, you must install the Node package at least version 16.10.0.</p>
<p></p>
<h2>Gendiff example</h2>
<h3>An example of how the program works when comparing two JSON files. The example introduces relative and absolute paths.</h3>
<a href="https://asciinema.org/a/Va2GJdCoDnq58talb62r2XAdO" target="_blank"><img src="https://asciinema.org/a/Va2GJdCoDnq58talb62r2XAdO.svg" /></a>
<p></p>
<h3>An example of how the program works when comparing two YML files. The example introduces relative and absolute paths.</h3>
<a href="https://asciinema.org/a/YljUJ0XIjr3cCQjMQKck1JmMI" target="_blank"><img src="https://asciinema.org/a/YljUJ0XIjr3cCQjMQKck1JmMI.svg" /></a>
<p></p>
<h3>An example of how the program works when comparing with JSON and YAML layered files.</h3>
<a href="https://asciinema.org/a/7rHtoQthJxOqBIGjCGJmfxsne" target="_blank"><img src="https://asciinema.org/a/7rHtoQthJxOqBIGjCGJmfxsne.svg" /></a>
<p></p>
<h3>An example of working in two variants of formatting the results: 'stylish' and 'plain'.</h3>
<a href="https://asciinema.org/a/tMY2m0wcj2I4LVJ0WkmisGcr7" target="_blank"><img src="https://asciinema.org/a/tMY2m0wcj2I4LVJ0WkmisGcr7.svg" /></a>
<p></p>
<h3>An example of working with outputting results in 'JSON' format.</h3>
<a href="https://asciinema.org/a/WBn1Mojc4Y3E3KCgM5M0gMe0s" target="_blank"><img src="https://asciinema.org/a/WBn1Mojc4Y3E3KCgM5M0gMe0s.svg" /></a>
