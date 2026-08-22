<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { CENTER_PETA } from '$lib/constants.js';
	import markerIcon from 'leaflet/dist/images/marker-icon.png';
	import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
	import markerShadow from 'leaflet/dist/images/marker-shadow.png';

	let { pins = [] } = $props();

	let container;
	let map;

	onMount(async () => {
		if (!browser || !container) return;

		const Leaflet = await import('leaflet');
		const L = Leaflet.default ?? Leaflet;
		await import('leaflet/dist/leaflet.css');

		delete L.Icon.Default.prototype._getIconUrl;
		L.Icon.Default.mergeOptions({
			iconRetinaUrl: markerIcon2x,
			iconUrl: markerIcon,
			shadowUrl: markerShadow
		});

		map = L.map(container, {
			center: [CENTER_PETA.lat, CENTER_PETA.lng],
			zoom: 13,
			scrollWheelZoom: true
		});

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
			maxZoom: 19
		}).addTo(map);

		const group = [];
		for (const u of pins) {
			if (!u.koordinat) continue;
			const marker = L.marker([u.koordinat.lat, u.koordinat.lng]).addTo(map);
			marker.bindPopup(
				`<div style="font-family: 'Plus Jakarta Sans', system-ui, sans-serif; min-width: 140px"><strong style="font-size: 14px; color: #0F172A">${escapeHtml(u.nama_usaha)}</strong><br/><span style="font-size: 12px; color: #64748B">${escapeHtml(u.kategori)}</span><br/><a href="/umkm/${encodeURIComponent(u.id)}" style="display:inline-block; margin-top: 6px; font-size: 12px; font-weight: 600; color: #1D4ED8; text-decoration: none">Lihat Detail →</a></div>`
			);
			group.push([u.koordinat.lat, u.koordinat.lng]);
		}

		if (group.length > 1) {
			map.fitBounds(L.latLngBounds(group), { padding: [40, 40], maxZoom: 14 });
		} else if (group.length === 1) {
			map.setView(group[0], 14);
		}

		setTimeout(() => map.invalidateSize(), 200);

		return () => {
			if (map) {
				map.remove();
				map = null;
			}
		};
	});

	function escapeHtml(s) {
		return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	}
</script>

<div bind:this={container} class="h-[720px] w-full overflow-hidden" role="img" aria-label="Peta sebaran UMKM"></div>

<style>
	:global(.leaflet-container) {
		font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
	}
	:global(.leaflet-popup-content-wrapper) {
		border-radius: 12px;
		box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
	}
	:global(.leaflet-popup-tip) {
		background: white;
	}
	/* Suppress CSS-based icon URLs injected by leaflet.css — our mergeOptions provides hashed URLs */
	:global(.leaflet-default-icon-path) {
		background-image: none !important;
	}
</style>
