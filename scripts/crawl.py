#!/usr/bin/env python

import re
import time
import statistics
from urllib.parse import urlparse
from collections import defaultdict

import requests


def seconds(s):
    return f"{s * 1000:.1f}ms"


def main(args):
    r = requests.get("http://localhost:3000/sitemap.xml")
    r.raise_for_status()
    if args:
        max_urls = int(args[0])
    else:
        max_urls = 0

    paths = []

    for loc in re.findall("<loc>(.*?)</loc>", r.text):
        path = urlparse(loc).path
        paths.append(path)

    oc_paths = []
    for oc in (
        "Node",
        "JavaScript",
        "Python",
        "Web+development",
        "PostgreSQL",
        "Django",
        "This+site",
        "Misc.+links",
        "Linux",
        "Zope",
    ):
        for i in range(4):
            if i > 1:
                oc_paths.append(f"/oc-{oc}/p{i}")
            else:
                oc_paths.append(f"/oc-{oc}")
    paths.extend(oc_paths)

    urls = [f"http://localhost:3000" + x for x in paths]

    import random

    random.shuffle(urls)

    times = defaultdict(list)
    for i, url in enumerate(urls[: max_urls or 9999]):
        t0 = time.time()
        r = requests.get(url)
        t1 = time.time()
        if r.status_code == 404:
            print("404 on ", url)
            continue
        r.raise_for_status()
        print(i + 1, seconds(t1 - t0).ljust(10), r.headers["x-middleware-cache"], url)
        times[r.headers["x-middleware-cache"]].append(t1 - t0)

    for cache_hit, numbers in times.items():
        print(
            cache_hit.ljust(10),
            seconds(statistics.mean(numbers)),
            f"({len(numbers)} samples)",
        )


if __name__ == "__main__":
    import sys

    main(sys.argv[1:])
