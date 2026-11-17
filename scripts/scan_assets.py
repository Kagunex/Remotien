#!/usr/bin/env python3
"""Cek aset foto di public/ dan tulis src/config/assets.json (kode memakai aset hanya jika ada)."""
import json, os
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
PUB = os.path.join(ROOT, 'public')
EXPECTED = {
    'apartment': 'environments/apartment/apartment.jpg',
    'hallway': 'environments/hallway/hallway.jpg',
    'bedroom': 'environments/bedroom/bedroom.jpg',
    'laboratory': 'environments/laboratory/laboratory.jpg',
    'smartphone': 'props/smartphone/smartphone.png',
    'clock': 'props/clock/clock.png',
    'television': 'props/television/television.png',
    'door': 'props/door/door.png',
    'window-rain': 'props/window-rain/window-rain.png',
    'recording-equipment': 'props/recording-equipment/recording-equipment.png',
}
found = {k: v for k, v in EXPECTED.items() if os.path.exists(os.path.join(PUB, v))}
json.dump(found, open(os.path.join(ROOT, 'src/config/assets.json'), 'w'), indent=2)
print('ditemukan:', ', '.join(found) or '-')
print('belum ada:', ', '.join(k for k in EXPECTED if k not in found) or '-')
